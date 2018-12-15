<template>
  <div>
    <weather-info />
    <div class="dashboard-editor-container">
      <el-row>
        <el-col
          :sm="18"
        >
          <img
            :src="detail"
            style="width:100%;max-width:800px;"
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import WeatherInfo from './components/WeatherInfo.vue';

export default {
	name: 'Index',
	components: {
		WeatherInfo
	},
	data() {
		return {
			panelData: {},
			detail: require('@/assets/bduss.png')
		};
	},
	computed: {},
	methods: {},
	created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .dashboard-editor-container {
    position: relative;
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media only screen and (max-width: 768px) {
    .dashboard-editor-container {
      padding: 16px;
      .chart-wrapper {
        padding: 8px 8px 0;
        margin-bottom: 16px;
      }
    }
  }
</style>
