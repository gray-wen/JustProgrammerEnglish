import Taro, { Component } from "@tarojs/taro";
import "./word.scss"
import { View, Text, Navigator } from "@tarojs/components";

import { NavigationBar } from "../../components";

interface WordState {
    scrollTop: number
}

export default class Word extends Component<{}, WordState> {

    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }


    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ height: windowHeight - 45 + "px" }}>
            <NavigationBar title="技术词汇" scrollTop={scrollTop}></NavigationBar>
            <View className="page-content">
                <View className="page-nav">
                    <View>
                        <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart nav-icon"></Text>
                    </View>
                </View>
                <View className="flex-custom">
                    <View className="flex-custom-item">
                        <View className="flex-custom-item-word">
                            conservation
                        </View>
                        <View className="flex-custom-item-title">读音释义</View>
                        <View className="flex-custom-item-phonetic">
                            <View>英 [.kɒnsə(r)'veɪʃ(ə)n]</View>
                            <View>美 [.kɑnsər'veɪʃ(ə)n]</View>
                        </View>
                        <View className="flex-custom-item-cn">
                            <View>保护；保存；</View>
                        </View>
                        <View className="flex-custom-item-title">搭配</View>
                        <View className="flex-custom-item-collocation">
                            start project,study project,implement project,project image,design project
                        </View>
                        <View className="flex-custom-item-title">例句<Navigator url="">(推荐?)</Navigator></View>
                        <View className="flex-custom-item-sentences">
                            <View className="flex-custom-sentence-cn">
                                涂料染色具有工艺简单、节约能源、拼色方便、风格独特等优点而备受消费者的喜爱。
                            </View>
                            <View className="flex-custom-sentence-en">
                                Pigment dyeing, due to its simple technique, energy conservation, easy to color matching and its own style, is loved by customers.
                            </View>
                        </View>
                        <View className="next-item"><Navigator url="">下一个词汇</Navigator></View>
                        <View className="page-help">
                            <Navigator url="">单词有问题?</Navigator>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}