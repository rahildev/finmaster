<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Bütün əlaqə məlumatlarını göstər
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::orderBy('sort_order')->get();
        return ContactResource::collection($contacts);
    }

    /**
     * Yeni əlaqə məlumatı yarat
     */
    public function store(Request $request): JsonResponse
    {
        Cache::forget('landing_page_data');
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'label_en' => 'nullable|string|max:255',
            'value' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact = Contact::create($validator->validated());

        return (new ContactResource($contact))->response()->setStatusCode(201);
    }

    /**
     * Tək əlaqə məlumatını göstər
     */
    public function show(string $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        return new ContactResource($contact);
    }

    /**
     * Əlaqə məlumatını yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $contact = Contact::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|string|max:255',
            'label' => 'sometimes|string|max:255',
            'label_en' => 'nullable|string|max:255',
            'value' => 'sometimes|string|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contact->update($validator->validated());

        return new ContactResource($contact);
    }

    /**
     * Əlaqə məlumatını sil
     */
    public function destroy(string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Əlaqə məlumatı silindi'], 200);
    }
}
