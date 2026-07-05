// deps

    // natives
    const { deepStrictEqual, strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals

        // utils
        const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

    const GOOD_OPTIONS = {
        "packageFile": join(__dirname, "..", "package.json"),
        "descriptorFile": join(__dirname, "utils", "DescriptorUser", "Descriptor.json"),
        "mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
        "serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
    };

    const PACKAGE_DIRECTORY = join(__dirname, "utils", "Orchestrator");

// tests

describe("Orchestrator / load / authors & repository", () => {

    describe("authors", () => {

        it("should extract a single author", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_author_only.json");

            return orchestrator.load().then(() => {

                strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
                ok(orchestrator.authors instanceof Array, "Generated orchestrator authors is not an Array");
                deepStrictEqual(orchestrator.authors, [ "Sébastien VIDAL" ], "Generated orchestrator authors is not as expected");
                ok(!orchestrator._extended.includes("author"), "author should not be in extended properties");
                ok(!orchestrator._extended.includes("authors"), "authors should not be in extended properties");

            });

        });

        it("should extract multiple authors from authors field", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_authors_only.json");

            return orchestrator.load().then(() => {

                strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
                ok(orchestrator.authors instanceof Array, "Generated orchestrator authors is not an Array");
                deepStrictEqual(orchestrator.authors, [
                    "Sébastien VIDAL",
                    "Fabien VIDAL"
                ], "Generated orchestrator authors is not as expected");
                ok(!orchestrator._extended.includes("authors"), "authors should not be in extended properties");

            });

        });

        it("should merge authors and author without duplicate", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_authors_and_author.json");

            return orchestrator.load().then(() => {

                deepStrictEqual(orchestrator.authors, [
                    "Sébastien VIDAL",
                    "Fabien VIDAL"
                ], "Generated orchestrator authors is not as expected");

            });

        });

        it("should not duplicate author already present in authors", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_authors_duplicate_author.json");

            return orchestrator.load().then(() => {

                deepStrictEqual(orchestrator.authors, [ "Sébastien VIDAL" ], "Generated orchestrator authors is not as expected");

            });

        });

        it("should keep empty authors when package has no author fields", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_minimal.json");

            return orchestrator.load().then(() => {

                deepStrictEqual(orchestrator.authors, [], "Generated orchestrator authors is not as expected");

            });

        });

    });

    describe("repository", () => {

        it("should extract a string repository", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_repository_string.json");

            return orchestrator.load().then(() => {

                strictEqual(typeof orchestrator.repository, "string", "Generated orchestrator repository is not a string");
                strictEqual(orchestrator.repository, "https://github.com/user/repo", "Generated orchestrator repository is not as expected");
                ok(!orchestrator._extended.includes("repository"), "repository should not be in extended properties");

            });

        });

        it("should extract and clean an object repository url", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_repository_object.json");

            return orchestrator.load().then(() => {

                strictEqual(typeof orchestrator.repository, "string", "Generated orchestrator repository is not a string");
                strictEqual(orchestrator.repository, "git+https://github.com/user/repo.git", "Generated orchestrator repository is not as expected");
                ok(!orchestrator._extended.includes("repository"), "repository should not be in extended properties");

            });

        });

        it("should extract repository from main package object url", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            return orchestrator.load().then(() => {

                strictEqual(orchestrator.repository, "git://github.com/Psychopoulet/node-pluginsmanager-plugin.git", "Generated orchestrator repository is not as expected");
                ok(!orchestrator._extended.includes("repository"), "repository should not be in extended properties");

            });

        });

        it("should keep empty repository when package has no repository field", () => {

            const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

            orchestrator._packageFile = join(PACKAGE_DIRECTORY, "package_minimal.json");

            return orchestrator.load().then(() => {

                strictEqual(orchestrator.repository, "", "Generated orchestrator repository is not as expected");

            });

        });

    });

});
