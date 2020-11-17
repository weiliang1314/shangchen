import { debounce } from './utits'
import backtop from 'components/content/backtop/backtop'
import { BACK_POSITION } from 'common/const';
import { POP, SELL, NEW } from "common/const";

export const itemlistmixin = {
        data() {
            return {
                itemlist: null,
                refreshs: null
            }
        },
        mounted() {
            //防抖防止频繁的刷新
            this.refreshs = debounce(this.$refs.scroll.refresh, 100)
            this.itemlist = () => {
                refreshs()
            }
            this.$bus.$on('itemimageload', this.itemlist)
            console.log('混入的东西')
        }
    }
    //混入封装：点击图标回到顶部
export const backtopmixin = {
    components: { backtop },
    data() {
        return { isshowbacktop: false }
    },
    methods: {
        backclick() { this.$refs.scroll.scrollTo(0, 0) }
    }
}


export const tabControlMixin = {
    data() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            console.log(this.currentType);
        }
    }
}