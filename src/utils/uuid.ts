// uuid 名称
const uuidName = 'App-uuid';
// 默认格式
const uuidFormat = 'xxxxx-xxxx-xxx-xxxxx';

/** 保存 uuid 到缓存
 * @Param uuid
 * @Returns boolean
 */
export function saveUUID(uuid: string): string | boolean {
    try {
        localStorage.setItem(uuidName, uuid)
        return uuid
    } catch (e) {
        console.error(e)
        return false
    }
}

/** 创建一个uuid
 * @Returns uuid { xxxxx-xxxx-xxx-xxxxx }
 */
export function createUUID(format = uuidFormat) {
    return saveUUID(format.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)))
}

/** 从缓存获取 uuid
 *  @Returns null |  uuid: { xxxxx-xxxx-xxx-xxxxx }
 */
export function getUUID(): string | null {
    return localStorage.getItem(uuidName)
}

/** 删除 uuid
 * @Returns boolean
 */
export const delUUID = (): boolean => {
    try {
        localStorage.removeItem(uuidName)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
