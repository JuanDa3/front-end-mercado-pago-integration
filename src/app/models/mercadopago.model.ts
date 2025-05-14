export interface PreferenceItem {
  id: number;
  title: string;
  unit_price: number;
  description: string;
  category_id: string;
  picture_url: string;
  quantity: number;
}

export interface PreferenceRequest {
  items: PreferenceItem[];
}

export interface BackUrls {
  failure: string;
  pending: string;
  success: string;
}

export interface PreferenceResponse {
  message: string;
  data: {
    id: string;
    init_point: string;
    sandbox_init_point: string;
    back_urls: BackUrls;
    items: PreferenceItem[];
    // Otros campos que puedas necesitar
  };
}
