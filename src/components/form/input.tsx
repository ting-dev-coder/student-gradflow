import { Group, Stack, TextInput, Input as MantineInput, Box } from "@mantine/core";
import { ChangeEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IControllerInput<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	handleInputChange?: (field: keyof T) => void;
}

function ControllerInput<T extends FieldValues>({ control, name, handleInputChange, ...props }: IControllerInput<T>) {
	// 處理輸入改變的邏輯
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (handleInputChange) {
			handleInputChange(name);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextInput
					{...field}
					{...props}
					onChange={(e) => {
						field.onChange(e);
						handleChange(e);
					}}
				/>
			)}
		/>
	);
}

export default ControllerInput;
