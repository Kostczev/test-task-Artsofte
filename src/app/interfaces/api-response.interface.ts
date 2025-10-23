export interface ApiResponse<T> {
    data: T[];
    total_pages: number;
    has_prev: boolean;
    has_next: boolean;
}

export interface Company {
    id: number
    uid: string
    business_name: string
    suffix: string
    industry: string
    type: string
    catch_phrase: string
    phone_number: string
    full_address: StreamPipeOptions
    latitude: number
    longitude: number
    logo: string
}

export interface SortConfig {
    field: string
    order: string
}

export interface CompanyFilters {
    q: string,
    industry: string,
    company_type: string
}