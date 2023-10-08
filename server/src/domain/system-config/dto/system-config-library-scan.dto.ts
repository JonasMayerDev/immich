import { IsBoolean, IsNotEmpty, IsString, Validate, ValidateIf } from 'class-validator';
import cron from 'cron-validator';

const isEnabled = (config: SystemConfigLibraryScanDto) => config.enabled;
const validateCron = (config: SystemConfigLibraryScanDto) => cron.isValidCron(config.cronExpression);

export class SystemConfigLibraryScanDto {
  @IsBoolean()
  enabled!: boolean;

  @ValidateIf(isEnabled)
  @IsNotEmpty()
  @Validate(validateCron)
  @IsString()
  cronExpression!: string;
}
