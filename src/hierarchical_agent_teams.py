import yaml
from langchain_community.document_loaders import WebBaseLoader
from requests import post
from iat_agent.lambdas.lambdas import LambdaFunction
from iat_agent.interfaces.interfaces import ConfigCrate, InputCrate
from iat_agent.pipelines.pipeline import IATAgentPipeline
from json import dumps
from tempfile import TemporaryDirectory
from pathlib import Path
from os import environ

class WebSearchTool(LambdaFunction):
    def __call__(self, query: str) -> list[str]:
        key = environ.get("TVLY_KEY")
        data = {"api_key": key, "query": query}
        headers = {'Content-Type': 'application/json'}
        response = post("https://api.tavily.com/search", data=dumps(data), headers=headers).json()
        urls = [r.get("url") for r in response.get('results', [])[:5]]
        # return response.get('results', [])[:5]
        return urls


class ScrapeWeb(LambdaFunction):
    def __call__(self, urls: list[str]) -> str:
        docs = WebBaseLoader(urls).load()
        result = "\n\n".join(
            [
                f'<Document name="{doc.metadata.get("title", "")}">\n{doc.page_content}\n</Document>'
                for doc in docs
            ]
        )
        return result


# _TEMP_DIRECTORY = TemporaryDirectory()
# WORKING_DIRECTORY = Path(_TEMP_DIRECTORY.name)

WORKING_DIRECTORY = Path.cwd()
print(WORKING_DIRECTORY)

class CreateOutline(LambdaFunction):
    def __call__(self, main_points: list[str], file_name_for_outline: str) -> str:
        with (WORKING_DIRECTORY / file_name_for_outline).open("w") as file:
            for i, point in enumerate(main_points):
                file.write(f"{i + 1}. {point}\n")
        return f"Outline saved to {file_name_for_outline}"


class ReadDocument(LambdaFunction):
    def __call__(self, file_name_to_read_document: str, start_line: int, end_line: int) -> str:
        with (WORKING_DIRECTORY / file_name_to_read_document).open("r") as file:
            lines = file.readlines()
        if start_line is None:
            start = 0
        return "\n".join(lines[start_line:end_line])


class WriteDocument(LambdaFunction):
    def __call__(self, content: str, file_name_to_save_document: str) -> str:
        with (WORKING_DIRECTORY / file_name_to_save_document).open("w") as file:
            file.write(content)
        return f"Document saved to {file_name_to_save_document}"


class EditDocument(LambdaFunction):
    def __call__(self, file_name_to_edit: str, inserts_lineno_content: dict[int, str]) -> str:
        with (WORKING_DIRECTORY / file_name_to_edit).open("r") as file:
            lines = file.readlines()

        sorted_inserts = sorted(inserts_lineno_content.items())

        for line_number, text in sorted_inserts:
            if 1 <= line_number <= len(lines) + 1:
                lines.insert(line_number - 1, text + "\n")
            else:
                return f"Error: Line number {line_number} is out of range."

        with (WORKING_DIRECTORY / file_name_to_edit).open("w") as file:
            file.writelines(lines)

        return f"Document edited and saved to {file_name_to_edit}"


async def build():
    with open("resources/hierarchical_agent_teams_config.yaml") as fi:
        cfg = yaml.safe_load(fi)
        config_crate = ConfigCrate(**cfg)
        pipeline = await IATAgentPipeline.instantiate(config_crate)
        return pipeline


async def ask(pipeline, graph, user_query):
    input_crate = InputCrate(**{"pipeline_placeholders": {"messages": [("user", user_query)]}})
    result = await pipeline.lowcode_pipeline_async(**{"pipeline_input": input_crate,
                                                      "predefined_runtime_graph_label": graph})
    print(result.output.get("messages")[::-5])


if __name__ == "__main__":
    import asyncio
    iat_pipeline = asyncio.run(build())
    asyncio.run(ask(iat_pipeline, "research_graph", "when is Taylor Swift's next tour?"))
    # asyncio.run(ask(iat_pipeline, "doc_writer_graph", "Write an outline for poem about cats and then write the poem to disk."))
    # asyncio.run(ask(iat_pipeline, "research_and_doc_writer_graph", "When is Taylor Swift's next tour and write an outline for poem about cats and then write the poem to disk."))