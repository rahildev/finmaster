<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'name_en'         => $this->name_en,
            'heading'         => $this->heading,
            'heading_en'      => $this->heading_en,
            'description'     => $this->description,
            'description_en'  => $this->description_en,
            'duration'        => $this->duration,
            'duration_en'     => $this->duration_en,
            'price'           => $this->price,
            'image_url'       => $this->image_url,
            'sort_order'      => $this->sort_order,
            'is_active'       => $this->is_active,
            'page_content'    => $this->page_content,
            'page_content_en' => $this->page_content_en,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
