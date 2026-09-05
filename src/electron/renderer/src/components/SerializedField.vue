<script setup lang="ts">
import { ChevronDown, FileText, Hash, Check, X, Package, AlertCircle, CalendarDays, MapPin, Brackets, Braces, CircleQuestionMark } from 'lucide-vue-next';
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from 'reka-ui';
import { useClipboard } from '@renderer/composables/useClipboard';
import { toHexString } from '@renderer/assets/js/util';
import type { SerializedField } from '@/types/serialized-message';

const { copyToClipboard } = useClipboard();

const props = defineProps<{
	fieldKey: string;
	field: SerializedField;
	depth: number;
}>();

function getTypeIcon(field: SerializedField) {
	if (field === null || field === undefined) {
		return {
			icon: AlertCircle,
			class: 'w-4 h-4 text-[#aab0bb]'
		};
	}

	if (field.__typeName === 'Variant') {
		return getTypeIcon(field.__value);
	}

	if (field.__typeName === 'String' || field.__displayTypeName === 'String') {
		return {
			icon: FileText,
			class: 'w-4 h-4 text-blue-500'
		};
	}

	if (field.__typeName === 'Map') {
		return {
			icon: Braces,
			class: 'w-4 h-4 text-orange-500'
		};
	}

	if (field.__typeName === 'DateTime') {
		return {
			icon: CalendarDays,
			class: 'w-4 h-4 text-blue-400'
		};
	}

	if (field.__typeName === 'StationURL') {
		return {
			icon: MapPin,
			class: 'w-4 h-4 text-blue-400'
		};
	}

	if (Array.isArray(field.__value)) {
		return {
			icon: Brackets,
			class: 'w-4 h-4 text-purple-500'
		};
	}

	if ('__fields' in field) {
		return {
			icon: Package,
			class: 'w-4 h-4 text-yellow-500'
		};
	}

	if ('__value' in field && (typeof field.__value === 'number' || field.__typeName === 'PID' || field.__typeName === 'UInt64' || field.__typeName === 'Int64')) {
		return {
			icon: Hash,
			class: 'w-4 h-4 text-green-500'
		};
	}

	if (typeof field.__value === 'boolean') {
		if (field.__value) {
			return {
				icon: Check,
				class: 'w-4 h-4 text-green-500'
			};
		}

		return {
			icon: X,
			class: 'w-4 h-4 text-red-500'
		};
	}

	return {
		icon: CircleQuestionMark,
		class: 'w-4 h-4 text-gray-500'
	};
}

function getDisplayValue(field: SerializedField): string {
	if (field.__typeName === 'Buffer' || field.__typeName === 'QBuffer') {
		return toHexString(field.__value);
	}

	return `${field.__value}`;
}

// * Only currently used to save HTTP form file uploads
function saveValue(field: SerializedField): void {
	const bytes = field.__bytes ?? (Array.isArray(field.__value) ? field.__value : undefined);

	if (!bytes) {
		return;
	}

	window.api.saveBytes(field.__filename ?? props.fieldKey, new Uint8Array(bytes));
}

function copyValue(e: MouseEvent, field: SerializedField): void {
	if (field.__typeName === 'Buffer' || field.__typeName === 'QBuffer') {
		copyToClipboard(e, toHexString(field.__value));
	} else {
		copyToClipboard(e, field.__value.toString());
	}
}

const isList = props.field && props.field.__typeName === 'List' && props.field.__value !== null && props.field.__value !== undefined && Array.isArray(props.field.__value);
const isMap = props.field && props.field.__typeName === 'Map' && props.field.__value !== null && props.field.__value !== undefined && Array.isArray(props.field.__value);
const hasExpandableContent = props.field && (
	'__fields' in props.field ||
	(props.field.__value !== null && props.field.__value !== undefined && typeof props.field.__value === 'object' && !Array.isArray(props.field.__value)) ||
	(typeof props.field === 'object' && !props.field.__typeName && props.field.__value === undefined)
);
const typeIcon = getTypeIcon(props.field);
const typeName = props.field.__displayTypeName || props.field.__typeName || typeof props.field;
const isVariant = props.field.__typeName === 'Variant';
const variantInner = isVariant ? props.field.__value as SerializedField : null;
const variantIsComplex = variantInner && ('__fields' in variantInner || (typeof variantInner.__value === 'object' && variantInner.__value !== null && !Array.isArray(variantInner.__value)));
</script>

<template>
	<AccordionRoot v-if="isList" class="w-full" type="single" :collapsible="true">
		<AccordionItem v-slot="{ open }" class="border-0" :value="fieldKey">
			<AccordionTrigger class="flex py-1 hover:no-underline" :class="depth > 0 ? 'ml-4 w-[calc(100%-1rem)]' : 'w-full'">
				<div class="flex items-center justify-between w-full">
					<div class="flex items-center">
						<div class="w-5 flex-shrink-0">
							<component :is="typeIcon.icon" :class="typeIcon.class" />
						</div>
						<div class="font-medium text-sm flex items-center">
							<span>{{ fieldKey }}</span>
							<span class="text-xs text-[#aab0bb] ml-1">{{ field.__displayTypeName || `Array[${field.__value.length}]` }}</span>
						</div>
					</div>
					<ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': open }" />
				</div>
			</AccordionTrigger>
			<AccordionContent class="overflow-hidden text-sm transition-all">
				<div class="pl-2 border-l border-[#25282d] ml-3 space-y-1">
					<template v-for="(item, itemIndex) in field.__value" :key="itemIndex">
						<div class="mb-1">
							<SerializedField :field="item" :field-key="`[${itemIndex}]`" :depth="depth + 1" />
						</div>
					</template>
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>

	<AccordionRoot v-else-if="isMap" class="w-full" type="single" :collapsible="true">
		<AccordionItem v-slot="{ open }" class="border-0" :value="fieldKey">
			<AccordionTrigger class="flex py-1 hover:no-underline" :class="depth > 0 ? 'ml-4 w-[calc(100%-1rem)]' : 'w-full'">
				<div class="flex items-center justify-between w-full">
					<div class="flex items-center">
						<div class="w-5 flex-shrink-0">
							<component :is="typeIcon.icon" :class="typeIcon.class" />
						</div>
						<div class="font-medium text-sm flex items-center">
							<span>{{ fieldKey }}</span>
							<span class="text-xs text-[#aab0bb] ml-1">{{ field.__displayTypeName || `Map[${field.__value.length}]` }}</span>
						</div>
					</div>
					<ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': open }" />
				</div>
			</AccordionTrigger>
			<AccordionContent class="overflow-hidden text-sm transition-all">
				<div class="pl-2 border-l border-[#25282d] ml-3 space-y-1">
					<template v-for="(entry, entryIndex) in field.__value" :key="entryIndex">
						<div class="mb-1">
							<AccordionRoot class="w-full" type="single" :collapsible="true">
								<AccordionItem v-slot="{ open: entryOpen }" class="border-0" :value="`entry-${entryIndex}`">
									<AccordionTrigger class="flex py-1 hover:no-underline" :class="depth > 0 ? 'ml-4 w-[calc(100%-1rem)]' : 'w-full'">
										<div class="flex items-center justify-between w-full">
											<div class="flex items-center">
												<div class="w-5 flex-shrink-0">
													<component :is="typeIcon.icon" :class="typeIcon.class" />
												</div>
												<div class="font-medium text-sm flex items-center">
													<span>Entry {{ entryIndex }}</span>
													<span class="text-xs text-[#aab0bb] ml-1">{{ field.__displayTypeName }}</span>
												</div>
											</div>
											<ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': entryOpen }" />
										</div>
									</AccordionTrigger>
									<AccordionContent class="overflow-hidden text-sm transition-all">
										<div class="pl-2 border-l border-[#25282d] ml-3 space-y-1">
											<SerializedField :field="entry.key" field-key="Key" :depth="depth + 2" />
											<SerializedField :field="entry.value" field-key="Value" :depth="depth + 2" />
										</div>
									</AccordionContent>
								</AccordionItem>
							</AccordionRoot>
						</div>
					</template>
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>

	<div v-else-if="isVariant && !variantIsComplex" class="flex items-center py-1 border-b border-[#25282d]" :class="depth > 0 ? 'ml-4' : ''">
		<div class="w-5 flex-shrink-0">
			<component :is="typeIcon.icon" :class="typeIcon.class" />
		</div>
		<div class="font-medium text-sm flex items-center">
			<span>{{ fieldKey }}</span>
			<span class="text-xs text-[#aab0bb] ml-1">({{ typeName }})</span>
		</div>
		<div class="ml-2 flex-1 truncate">
			<span class="text-sm">{{ variantInner?.__value }}</span>
		</div>
	</div>

	<AccordionRoot v-else-if="isVariant && variantIsComplex && variantInner" class="w-full" type="single" :collapsible="true">
		<AccordionItem v-slot="{ open }" class="border-0" :value="fieldKey">
			<AccordionTrigger class="flex py-1 hover:no-underline border-b border-[#25282d]" :class="depth > 0 ? 'ml-4 w-[calc(100%-1rem)]' : 'w-full'">
				<div class="flex items-center justify-between w-full">
					<div class="flex items-center">
						<div class="w-5 flex-shrink-0">
							<component :is="typeIcon.icon" :class="typeIcon.class" />
						</div>
						<div class="font-medium text-sm flex items-center">
							<span>{{ fieldKey }}</span>
							<span class="text-xs text-[#aab0bb] ml-1">({{ typeName }})</span>
						</div>
					</div>
					<ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': open }" />
				</div>
			</AccordionTrigger>
			<AccordionContent class="overflow-hidden text-sm transition-all">
				<div class="pl-2 border-l border-[#25282d] ml-3 space-y-0">
					<SerializedField :field="variantInner" :field-key="variantInner?.__displayTypeName || 'value'" :depth="depth + 1" />
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>

	<div v-else-if="!hasExpandableContent" class="flex items-center py-1 border-b border-[#25282d]" :class="depth > 0 ? 'ml-4' : ''">
		<div class="w-5 flex-shrink-0">
			<component :is="typeIcon.icon" :class="typeIcon.class" />
		</div>
		<div class="font-medium text-sm flex items-center">
			<span>{{ fieldKey }}</span>
			<span v-if="typeName" class="text-xs text-[#aab0bb] ml-1">({{ typeName }})</span>
		</div>
		<div class="ml-2 flex-1 truncate">
			<span class="text-sm cursor-pointer hover:underline" @click="copyValue($event, field)">{{ getDisplayValue(field) }}</span>
		</div>
		<button v-if="field.__saveable" class="ml-2 flex-shrink-0 text-xs text-[#9a9fa9] hover:text-[#F9FAFC] transition-colors cursor-pointer" @click="saveValue(field)">Save to disk</button>
	</div>

	<AccordionRoot v-else class="w-full" type="single" :collapsible="true">
		<AccordionItem v-slot="{ open }" class="border-0" :value="field.__displayTypeName || typeName">
			<AccordionTrigger class="flex py-1 hover:no-underline" :class="depth > 0 ? 'ml-4 w-[calc(100%-1rem)]' : 'w-full'">
				<div class="flex items-center justify-between w-full">
					<div class="flex items-center">
						<div class="w-5 flex-shrink-0">
							<component :is="typeIcon.icon" :class="typeIcon.class" />
						</div>
						<div class="font-medium text-sm flex items-center">
							<span :class="fieldKey === 'parent' ? 'text-[#aab0bb]/60 italic' : ''">{{ fieldKey }}</span>
							<span v-if="typeName" class="text-xs text-[#aab0bb] ml-1">({{ typeName }})</span>
						</div>
					</div>
					<ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': open }" />
				</div>
			</AccordionTrigger>
			<AccordionContent class="overflow-hidden text-sm transition-all">
				<div class="pb-0 pt-0">
					<div v-if="'__parent' in field" class="pl-2 border-l border-[#25282d] ml-3 space-y-0">
						<SerializedField :field="field.__parent!" :field-key="'parent'" :depth="depth + 1" />
						<div class="border-t border-[#25282d]/70 mx-1 my-0.5" />
					</div>
					<div v-if="'__fields' in field" class="pl-2 border-l border-[#25282d] ml-3 space-y-0">
						<template v-for="(subField, subKey) in field.__fields" :key="subKey">
							<SerializedField :field="subField" :field-key="String(subKey)" :depth="depth + 1" />
						</template>
					</div>
					<div v-else-if="'__value' in field" class="pl-2 border-l border-[#25282d] ml-3 space-y-0">
						<template v-for="(subField, subKey) in field.__value" :key="subKey">
							<SerializedField :field="subField" :field-key="String(subKey)" :depth="depth + 1" />
						</template>
					</div>
					<div v-else class="pl-2 border-l border-[#25282d] ml-3 space-y-0">
						<template v-for="(subField, subKey) in field" :key="subKey">
							<SerializedField v-if="!String(subKey).startsWith('__')" :field="subField" :field-key="String(subKey)" :depth="depth + 1" />
						</template>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>
</template>
