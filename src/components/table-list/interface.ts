import {Vue} from "vue-property-decorator";

export type Size = 'mini' | 'small' | 'medium';
export type TableDom = Vue | Element | Vue[] | Element[] | null;

export interface TableHead {
    type?: 'index' | 'status' | 'Button' | 'selection' | 'radio' | 'expand'; // 类型
    // type?: string; // 类型
    slot?: string; // 插槽®®
    prop?: string; // 排序
    show?: boolean; // 显示
    label?: string; // 表头
    content?: string; // 内容
    radioValue?: string; // radio 专用
    operation?: [string]; // button 专用
    contentType?: string; // tag 专用
    width?: number | string; // 固定大小
    minWidth?: number | string; // 最小宽
    sortable?: boolean | 'custom'; // 排序
    fixed?: 'left' | 'right' | false; // 浮动
    align?: 'left' | 'right' | 'center'; // 字体浮动
    headerAlign?: 'left' | 'right' | 'center'; // 表头字体浮动
    selectable?: ((row?: object, index?: number) => boolean); // 专用 selectable
    formatter?: ((row?: object, column?: never, cellValue?: never, index?: number) => never); // 格式化
}
