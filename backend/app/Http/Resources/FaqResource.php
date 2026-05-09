<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'          => $this->id,
            'question'    => $this->question,
            'question_en' => $this->question_en,
            'answer'      => $this->answer,
            'answer_en'   => $this->answer_en,
            'sort_order'  => $this->sort_order,
            'is_active'   => $this->is_active,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
