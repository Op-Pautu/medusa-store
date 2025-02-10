import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";
import { generateHandle } from "../utils/generate-handle";

export type CreateBrandStepInput = {
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  featured?: boolean;
  metadata?: Record<string, unknown>;
};

// Step to validate and prepare brand data
export const prepareBrandDataStep = createStep(
  "prepare-brand-data",
  async (input: CreateBrandStepInput) => {
    const handle = generateHandle(input.name);

    return new StepResponse(
      {
        ...input,
        handle,
      },
      handle
    );
  }
);

// Step to create the brand
export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandStepInput & { handle: string }, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.createBrands(input);

    return new StepResponse(brand, brand.id);
  },
  async (id: string, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    await brandModuleService.deleteBrands(id);
  }
);

// Step to handle post-creation tasks
export const postBrandCreationStep = createStep(
  "post-brand-creation",
  async (brand: any, { container }) => {
    const eventBusService = container.resolve("eventBusService") as {
      emit: (event: string, data: any) => Promise<void>;
    };

    await eventBusService.emit("brand.created", {
      id: brand.id,
    });

    return new StepResponse(brand);
  }
);

type CreateBrandWorkflowInput = CreateBrandStepInput;

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandWorkflowInput) => {
    // Prepare the brand data
    const preparedData = prepareBrandDataStep(input);

    // Create the brand
    const brand = createBrandStep(preparedData);

    // Handle post-creation tasks
    const result = postBrandCreationStep(brand);

    return new WorkflowResponse(result);
  }
);
