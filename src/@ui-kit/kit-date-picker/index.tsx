import React from "react";
import { Datepicker, DatepickerProps } from "@ui-kitten/components";
import { PopoverPlacement } from "@ui-kitten/components/ui/popover/type";
import { IKitPlacements } from "../@types";

export interface KitDatePickerProps<D = Date> extends DatepickerProps<D> {
  placement?: IKitPlacements | PopoverPlacement;
}

export function KitDatePicker<D = Date>(props: KitDatePickerProps<D>) {
  return <Datepicker<D> {...props} />;
}
