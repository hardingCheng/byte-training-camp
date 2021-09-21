import loadsh from 'loadsh'
const btn = document.createElement('button')
btn.innerHTML = '123'

btn.onclick = async () => {
    // 按需加载
    const { user } = await import('./user')
    console.log(user)
}

document.body.appendChild(btn)

console.log("main")
