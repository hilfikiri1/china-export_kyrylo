import type { Messages } from "@/i18n/get-dictionary";
import {
  getSpecializationIcon,
  specializationIds,
  type Specialization,
  type SpecializationId,
} from "@/content/specializations";
import { getMessageArray, getMessageObject } from "@/i18n/translate";

type CategoryMessage = {
  id: string;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  items: string[];
  examples?: string;
};

type SpecializationsUi = {
  viewDetails: string;
  productsHeading: string;
  examplesHeading: string;
};

export function getSpecializationsUi(messages: Messages): SpecializationsUi {
  return (
    getMessageObject<SpecializationsUi>(messages, "specializations.ui") ?? {
      viewDetails: "",
      productsHeading: "",
      examplesHeading: "",
    }
  );
}

export function getSpecializations(messages: Messages): Specialization[] {
  const categories = getMessageArray<CategoryMessage>(
    messages,
    "specializations.categories",
  );

  return specializationIds.map((id) => {
    const category = categories.find((c) => c.id === id);
    if (!category) {
      throw new Error(`Missing specialization category: ${id}`);
    }

    return {
      id: id as SpecializationId,
      icon: getSpecializationIcon(id),
      title: category.title,
      shortDescription: category.shortDescription,
      extendedDescription: category.extendedDescription,
      items: category.items,
      examples: category.examples,
    };
  });
}

export function getSpecializationById(
  messages: Messages,
  id: string,
): Specialization | undefined {
  return getSpecializations(messages).find((s) => s.id === id);
}
