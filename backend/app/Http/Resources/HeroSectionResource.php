<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HeroSectionResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'title_en'    => $this->title_en,
            'subtitle'    => $this->subtitle,
            'subtitle_en' => $this->subtitle_en,
            'image_url'   => $this->image_url,
            'btn_text'    => $this->btn_text,
            'btn_text_en' => $this->btn_text_en,
            'btn_link'    => $this->btn_link,
            'sort_order'  => $this->sort_order,
            'is_active'   => $this->is_active,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
