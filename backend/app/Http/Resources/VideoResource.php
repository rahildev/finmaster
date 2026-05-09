<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'title_en'      => $this->title_en,
            'description'   => $this->description,
            'description_en'=> $this->description_en,
            'video_url'     => $this->video_url,
            'video_type'    => $this->video_type,
            'thumbnail_url' => $this->thumbnail_url,
            'sort_order'    => $this->sort_order,
            'is_active'     => $this->is_active,
            'course_id'     => $this->course_id,
            'course'        => $this->whenLoaded('course'),
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
