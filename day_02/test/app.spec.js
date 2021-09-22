const add = require('./add')
// 一定要确定输入与输出
test('should 1 + 1 = 2',() => {
    // 准备数据   given
    const a = 1
    const b = 1
    // 触发测试动作  when
    const r = add(a, b)
    // 验证 then
    expect(r).toBe(2)
})
