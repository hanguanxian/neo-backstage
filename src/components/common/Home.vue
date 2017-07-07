<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
          <!-- <transition name="move" mode="out-in"><router-view></router-view></transition> -->
          <el-col :span="20" class="content-wrapper">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click='tabToggle'>
              <el-tab-pane
                v-for="(item, index) in tabs"
                :label="item.tabName" :name="item.name"
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
    export default {
        data () {
          	return {
    	        user: {},
    	        tabs:[{
    		      	tabName: 'readme',
    		      	name: '0',
    		      	path: 'readme'
    		    }],
    	        editableTabsValue: '0',
    	        currentView:'readme',
    	        dic : { //前面是component,后面是对应的名字
    	        	"index" : "index",
    	        	"form" : "form",
    	        	"table" : "table",
    	        	"other" : "other",
    	        	"nav1" : "导航一",
    	        	"nav3" : "导航三"
    	        }
          	};
        },
        components:{
            vHead, vSidebar, Readme, VueTable, BaseTable
        },
        methods: {
    	    updateTabs(path){
    	    	var addNewTab = true;
    	    	var vm = this;
    	    	for(var i = 0; i <　vm.tabs.length; i++){
    	    		if(path == vm.tabs[i].path){
    	    			addNewTab = false;
    	    			vm.editableTabsValue = i + '';
    	    			vm.currentView = 'v-' + path;
    	    			return;
    	    		}
    	    	}

    	    	if(addNewTab){
    	    		vm.tabs.push({
    		          	tabName: vm.dic[path],
    		          	name: vm.tabs.length + '',
    		          	path: path
    		        });
    		        $('.el-tabs__item').removeClass('is-active');
    		        vm.editableTabsValue = vm.tabs.length - 1 + '';
    	    	}

    	    	vm.currentView = 'v-' + path;
    	    },
    	    handleSelect(key, keyPath) {
    	    	if(keyPath.length > 1){
    	    		this.updateTabs(keyPath[1]);
    	    	}else{
    	    		this.updateTabs(keyPath);
    	    	}
    	    },
    	    removeTab(targetIndex) {
    	    	var vm = this;
    	        var activeIndex = vm.editableTabsValue;
    	        if (activeIndex === targetIndex) {
    	          	vm.tabs.forEach(function(tab,index){
    	          		if (tab.name === targetIndex) {
    		              	var nextTab = vm.tabs[index + 1] || vm.tabs[index - 1];
    		              	if (nextTab) {
    		                	activeIndex = nextTab.name;
    		                	vm.currentView = 'v-' + nextTab.path;
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
    	    	vm.tabs.forEach(function(item,index){
    	    		if(item.tabName == tab.label){
    	    			vm.currentView = 'v-' + item.path;
    	    		}
    	    	})
    	    }
        }
    }
</script>
