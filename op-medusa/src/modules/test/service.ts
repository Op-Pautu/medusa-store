import { MedusaService } from "@medusajs/framework/utils";
import { Test } from "src/modules/test/models/test";

class TestModuleService extends MedusaService({
  Test,
}) {}

export default TestModuleService;
