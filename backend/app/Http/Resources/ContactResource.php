<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'         => $this->id,
            'type'       => $this->type,
            'label'      => $this->label,
            'label_en'   => $this->label_en,
            'value'      => $this->value,
            'icon'       => $this->icon,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
