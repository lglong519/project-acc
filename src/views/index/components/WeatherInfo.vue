<template>
	<el-row type="flex" align="middle" class="s-weather-wrapper">
		<span @click="selectCity">{{city}}</span>： {{week}}
		<i class="spacer"></i>
		{{lunar}}
		<i class="spacer"></i>
		<img :src="img">
		<i class="spacer"></i>
		{{temp}}
		<i class="spacer"></i>
		<el-tag size="mini" :type="quality">{{level}}</el-tag>
		<i class="spacer"></i>
		{{pm25}}
	</el-row>
</template>

<style lang="scss" scoped>
	.s-weather-wrapper {
	  height: 32px;
	  padding: 0 10px;
	  color: #666;
	  font-size: 12px;
	  img {
	    margin-right: -5px;
	    height: 20px;
	    filter: contrast(80%);
	  }
	  .spacer {
	    margin-right: 8px;
	  }
	  span {
	    cursor: pointer;
	  }
	}
</style>

<script>
import _ from 'lodash';
export default {
	data () {
		return {
			weather: JSON.parse(localStorage.getItem('weather')),
		};
	},
	computed: {
		city () {
			return _.get(this.weather, 'data.weather.content.city');
		},
		week () {
			return _.get(this.weather, 'data.weather.content.week');
		},
		temp () {
			return _.get(this.weather, 'data.weather.content.today.temp');
		},
		img () {
			return _.get(this.weather, 'data.weather.content.today.img[0]');
		},
		pm25 () {
			return _.get(this.weather, 'data.weather.content.today.pm25');
		},
		lunar () {
			return _.get(this.weather, 'data.weather.content.calendar.lunar');
		},
		quality(){
			if (this.pm25 <= 35) {
				return'success';
			}
			if (this.pm25 <= 75) {
				return '';
			}
			if (this.pm25 <= 115) {
				return 'warning';
			}
			if (this.pm25 <= 150) {
				return 'danger';
			}
			return 'danger';
		},
		level () {
			if (this.pm25 <= 35) {
				return '优';
			}
			if (this.pm25 <= 75) {
				return '良';
			}
			if (this.pm25 <= 115) {
				return '轻';
			}
			if (this.pm25 <= 150) {
				return '中';
			}
			return '重';
		}
	},
	methods: {
		selectCity () {

		}
	},
	async created () {
		this.weather = await this.get('dis/weather/东莞');
		localStorage.setItem('weather', JSON.stringify(this.weather));
	}
};
</script>


