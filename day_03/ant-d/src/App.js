import logo from './logo.svg';
import { Input,Menu,Row,Col  } from 'antd';
import { Button,Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './App.css';
function App() {
  return (
    <div className="App">
        <div className="container">
            <div className="home-top">
                <Row justify="space-around" align="middle">
                    <Col span={4}>
                        <h1>
                            <a id="logo" href="/">
                                <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                                Ant Design
                            </a>
                        </h1>
                    </Col>
                    <Col span={6}>
                        <Input placeholder="搜素" prefix={<SearchOutlined />} />
                    </Col>
                    <Col span={12}>
                        <Menu  mode="horizontal" style={{borderBottom:0}}>
                            <Menu.Item>
                                设计
                            </Menu.Item>
                            <Menu.Item>
                                文档
                            </Menu.Item>
                            <Menu.Item>
                                组件
                            </Menu.Item>
                            <Menu.Item>
                                资源
                            </Menu.Item>
                            <Menu.Item>
                                国内镜像
                            </Menu.Item>
                            <Menu.SubMenu title="4.17.0-alpha.0">
                                <Menu.Item key="setting:1">3.x</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </div>
        <div className="home-bottom">
           <div className="container home-bottom-flex">
               <img width="500" height="87" alt="Ant Design"
                    src="https://gw.alipayobjects.com/zos/antfincdn/6UYtAUYPXE/AntDesign.svg"
                    className="home-banner-normal"/>
               <p>企业级产品设计体系，创造高效愉悦的工作体验</p>
               <div className="banner-qr">
                   <a>
                       <img alt="mobile" src="https://gw.alipayobjects.com/zos/basement_prod/d2fa63a8-3e9d-4f59-80c7-1fd1d0cd9118.svg"/>
                       4.0 正式版发布
                   </a>
               </div>
               <div className="button-group">
                   <Button type="primary" shape="round" size={'large'}>
                       开始使用
                   </Button>
                   <Button  shape="round" size={'large'} style={{marginLeft:'29px'}}>
                       设计语言
                   </Button>
               </div>
           </div>
        </div>
    </div>
  );
}

export default App;
