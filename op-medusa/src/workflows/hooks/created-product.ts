import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { TEST_MODULE } from "src/modules/test";
import TestModuleService from "src/modules/test/service";

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.test_id) {
      return new StepResponse([], []);
    }
    const testModuleService: TestModuleService = container.resolve(TEST_MODULE);

    await testModuleService.retrieveTest(additional_data.test_id as string);

    // link product to test
    const link = container.resolve("link");
    const logger = container.resolve("logger");
    const links: LinkDefinition[] = [];

    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [TEST_MODULE]: {
          test_id: additional_data.test_id,
        },
      });
    }

    await link.create(links);

    logger.info("Linked test to products");

    return new StepResponse(links, links);
  },
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");
    await link.dismiss(links);
  }
);
