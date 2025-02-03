import { MedusaService } from "@medusajs/framework/utils";
import { Brand } from "src/modules/brand/models/brand";

class BrandModuleService extends MedusaService({
  Brand,
}) {}

export default BrandModuleService;
