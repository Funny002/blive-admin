type ElSelect = 'select' | 'selectTree';
type ElInput = 'text' | 'password' | 'textarea';
type ElDatePicker = 'year' | 'month' | 'date' | 'week' | 'datetime' | 'monthrange' | 'datetimerange' | 'daterange' | 'yearrange';
export type Type = ElDatePicker | ElSelect | ElInput;

export interface ItemBtn {
    [key: string]: string
}

export interface ItemRules {
    [key: string]: any
}

export interface DatePicker {
    format?: string;
    editable?: boolean;
    separator?: string;
    clearIcon?: string;
    prefixIcon?: string;
    valueFormat?: string;
    unlinkPanels?: boolean;
    pickerOptions?: {
        firstDayOfWeek?: number;
        disabledDate: (() => boolean);
        shortcuts?: { text?: string; onClick?: ((arr0: any) => void); }
        onPick?: (({maxDate, minDate}: { maxDate: Date; minDate: Date; }) => void);
    };
}

export interface Input {
    max?: number;
    append?: string;
    prepend?: string;
    btnList?: ItemBtn[]
    suffixIcon?: string;
    prefixIcon?: string;
}

export interface Select {
    remote?: boolean;
    loading?: boolean;
    groupTitle?: boolean;
    filterable?: boolean;
    filterMethod?: ((arr0: string) => void);
    remoteMethod?: ((arr0: string) => void);
    select?: { value: string | boolean | number, label: string }[] // 选择框
}

export interface FormItem extends Input, Select, DatePicker {
    type: Type; // 类型
    name: string; // 属性
    prop?: string;
    span?: number; // 大小
    slot?: string; // 类型
    label?: string;
    class?: string;
    default?: string;
    readonly?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    rules?: ItemRules[];
    placeholder?: string[] | string;
}
