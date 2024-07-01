import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class TemplateDataRequestDto {
    @IsString()
    id: string;

    @IsString()
    date: string;

    @IsString()
    customer_name: string;
}

export class PhoneDataRequestDto {
    @IsString()
    phone: string;

    @IsString()
    name: string;
}

export class CreateZnsCampaignRequestDto {
    @IsInt()
    id: number;

    @IsInt()
    restaurant_id: number;

    @IsInt()
    restaurant_brand_id: number;

    @IsString()
    name: string;

    @IsString()
    template_id: string;

    @IsOptional()
    template_data?: TemplateDataRequestDto;

    @IsString()
    send_at: string;

    @IsInt()
    running_status: number;

    @IsInt()
    message_recipient: number;

    @IsArray()
    @IsString({ each: true })
    phones: PhoneDataRequestDto[];

    @IsString()    
    authentication_code: string;
  
    @IsString()    
    refresh_token: string;
  
    @IsString()
    oa_id?: string;
    
    @IsString()
    app_id?: string;
  
    @IsString()
    code_verifier?: string;  

    @IsString()
    secret_key?: string;
}
