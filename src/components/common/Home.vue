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
    export default {
        data () {
          	return {
    	        user: {},
    	        tabs:[{
    		      	title: 'readme',
    		      	name: '0',
    		      	path: 'readme'
    		    },{
    		      	title: 'baseTable',
    		      	name: '1',
    		      	path: 'baseTable'
    		    },{
    		      	title: 'vueTable',
    		      	name: '2',
    		      	path: 'vueTable'
    		    }],
    	        editableTabsValue: '1',
    	        currentView:'baseTable',
    	        dic : { //前面是component,后面是对应的名字
    	        	"readme" : "readme",
    	        	"baseTable" : "baseTable",
                    "vueTable" : "vueTable"
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
    	    			vm.currentView =  path;
                        console.log(vm.currentView);
    	    			return;
    	    		}
    	    	}

    	    	if(addNewTab){
    	    		vm.tabs.push({
    		          	title: vm.dic[path],
    		          	name: vm.tabs.length + '',
    		          	path: path
    		        });
    		        $('.el-tabs__item').removeClass('is-active');
    		        vm.editableTabsValue = vm.tabs.length - 1 + '';
    	    	}

    	    	vm.currentView =  path;
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

    	    	vm.tabs.forEach(function(item,index){
    	    		if(item.title == tab.label){
    	    			vm.currentView = item.path;
    	    		}
    	    	})
    	    }
        },
        created () {
            console.log(this.router);
        }
    }
</script>
