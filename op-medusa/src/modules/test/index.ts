import { Module } from "@medusajs/framework/utils";
import TestModuleService from "src/modules/test/service";

export const TEST_MODULE = "test";

export default Module(TEST_MODULE, {
  service: TestModuleService,
});
