export type Size = 'mini' | 'small' | 'medium';

export interface DefaultObj {
    [key: string]: any;
}

export interface TableHead {
    type?: 'index' | 'status' | 'Button' | 'selection' | 'radio' | 'expand'; // 类型
    // type?: string; // 类型
    slot?: string; // 插槽®®
    prop?: string; // 排序
    show?: boolean; // 显示
    label?: string; // 表头
    content?: string; // 内容
    radioValue?: string; // radio 专用
    contentType?: string; // tag 专用
    width?: number | string; // 固定大小
    minWidth?: number | string; // 最小宽
    sortable?: boolean | 'custom'; // 排序
    operation?: [DefaultObj | string]; // button 专用
    fixed?: 'left' | 'right' | false; // 浮动
    align?: 'left' | 'right' | 'center'; // 字体浮动
    headerAlign?: 'left' | 'right' | 'center'; // 表头字体浮动
    selectable?: ((row?: object, index?: number) => boolean); // 专用 selectable
    formatter?: ((row?: object, column?: never, cellValue?: never, index?: number) => never); // 格式化

}

// 默认配置项
export const defaultConfig = {
    width: '50px',
    align: 'center',
    minWidth: '50px',
    headerAlign: "center"
} as TableHead
