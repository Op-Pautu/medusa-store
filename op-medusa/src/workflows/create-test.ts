import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { TEST_MODULE } from "src/modules/test";
import TestModuleService from "src/modules/test/service";

export type createTestStepInput = {
  name: string;
};

export const createTestStep = createStep(
  "create-test-step",
  async (input: createTestStepInput, { container }) => {
    const testModuleService: TestModuleService = container.resolve(TEST_MODULE);

    const test = await testModuleService.createTests(input);

    return new StepResponse(test, test.id);
  },
  async (id: string, { container }) => {
    const testModuleService: TestModuleService = container.resolve(TEST_MODULE);

    await testModuleService.deleteTests(id);
  }
);

type CreateTestWorkflowInput = {
  name: string;
};

export const createTestWorkflow = createWorkflow(
  "create-test",
  (input: CreateTestWorkflowInput) => {
    const test = createTestStep(input);
    return new WorkflowResponse(test);
  }
);
