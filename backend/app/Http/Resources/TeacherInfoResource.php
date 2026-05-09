<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherInfoResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'title'           => $this->title,
            'title_en'        => $this->title_en,
            'bio'             => $this->bio,
            'bio_en'          => $this->bio_en,
            'photo_url'       => $this->photo_url,
            'experience'      => $this->experience,
            'experience_en'   => $this->experience_en,
            'achievements'    => $this->achievements,
            'achievements_en' => $this->achievements_en,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
