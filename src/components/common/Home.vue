<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
          <!-- <transition name="move" mode="out-in"><router-view></router-view></transition> -->
          <el-col :span="20" class="content-wrapper">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click='tabToggle'>
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :label="item.title" :name="item.name" :key="item.name"
              >
              </el-tab-pane>
              <keep-alive>
                   <component :is='currentView'></component>
              </keep-alive>
             </el-tabs>
          </el-col>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import Readme from '../page/Readme.vue';
    import VueTable from '../page/VueTable.vue';
    import BaseTable from '../page/BaseTable.vue';
    import BaseForm from '../page/BaseForm.vue';
    import VueEditor from '../page/VueEditor.vue';
    import Markdown from '../page/Markdown.vue';
    import Upload from '../page/Upload.vue';
    import BaseCharts from '../page/BaseCharts.vue';
    import DragList from '../page/DragList.vue';
    export default {
        data () {
          	return {
    	        user: {},
    	        dic : { //前面是component,后面是对应的名字
    	        	"readme" : "readme",
    	        	"baseTable" : "baseTable",
                    "vueTable" : "vueTable",
                    "baseForm" : "baseForm",
                    "vueEditor" : "vueEditor",
                    "markdown" : "markdown",
                    "upload" : "upload",
                    "baseCharts " : "baseCharts",
                    "dragList " : "dragList"
    	        },
          	};
        },
        computed: {
	        editableTabs() {
	          	return this.$store.state.editableTabs
	        },
	        editableTabsValue() {
	          	return this.$store.state.editableTabsValue
	        },
	        currentView() {
	          	return this.$store.state.currentView
	        }
	    },
        components:{
            'vHead' : vHead,
            'vSidebar' : vSidebar,
            'readme' : Readme,
            'vuetable' : VueTable,
            'basetable' : BaseTable,
            "baseform" : BaseForm,
            "vueeditor" : VueEditor,
            "markdown" : Markdown,
            "upload" : Upload,
            "basecharts" : BaseCharts,
            'drag' : DragList
        },
        methods: {
    	    removeTab(targetIndex) {
    	    	var vm = this;
    	        var activeIndex = vm.editableTabsValue;
    	        if (activeIndex === targetIndex) {
    	          	vm.tabs.forEach(function(tab,index){
    	          		if (tab.name === targetIndex) {
    		              	var nextTab = vm.tabs[index + 1] || vm.tabs[index - 1];
    		              	if (nextTab) {
    		                	activeIndex = nextTab.name;
    		                	vm.currentView =  nextTab.path;
    		                	vm.tabs.splice(index,1);
    		              	}
    		            }
    	          	})
    	        }else{
    	        	vm.tabs.forEach(function(tab,index){
    	          		if (tab.name === targetIndex) {
    		              	vm.tabs.splice(index,1);
    		            }
    	          	})
    	        }
    	        vm.editableTabsValue = activeIndex;
    	        console.log(vm.tabs)
    	    },
    	    tabToggle(tab){
    	    	var vm = this;
    	    	vm.editableTabs.forEach(function(item,index){
    	    		if(item.title == tab.label){
    	    			vm.$store.dispatch('changeCurrentView', item.path);
    	    		}
    	    	})
    	    }
        }
    }
</script>
