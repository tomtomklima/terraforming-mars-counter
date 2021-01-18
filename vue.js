Vue.component('counter', {
	props: ['counter'],
	template: `
      <div class="counter">
      <div class="title">
        {{ counter.name.toUpperCase() }}
      </div>
      <div class="stats">
        <div class="column">
          <button v-on:click="counter.value -= 1">-1</button>
          <button v-on:click="counter.value -= 5">-5</button>
        </div>
        <input type="number" min="0" :value="counter.value">
        <div class="column">
          <button v-on:click="counter.value += 1">+1</button>
          <button v-on:click="counter.value += 5">+5</button>
        </div>
      </div>
      <div class="income">
        Income:
        <button
            v-on:click="counter.income -= 1; this.$root.doLog(counter.name + ' income changed to ' + counter.income);">
          -
        </button>
        <input type="number" min="0" :value="counter.income">
        <button v-on:click="counter.income += 1">+</button>
      </div>
      <div class="statistic">
        last value: <b>{{ counter.lastValue }}</b>, last income: <b>{{ counter.lastIncome }}</b>
      </div>
      </div>`,
});

new Vue({
	el: '#app',
	data: {
		counters: {
			'money': {name: 'money', value: 10, income: 20, lastValue: '#', lastIncome: '#',},
			'steel': {name: 'steel', value: 0, income: 0, lastValue: '#', lastIncome: '#',},
			'titan': {name: 'titan', value: 0, income: 0, lastValue: '#', lastIncome: '#',},
			'green': {name: 'trees', value: 0, income: 0, lastValue: '#', lastIncome: '#',},
			'energy': {name: 'energy', value: 0, income: 0, lastValue: '#', lastIncome: '#',},
			'heat': {name: 'hýt', value: 0, income: 0, lastValue: '#', lastIncome: '#',},
		},
		log: [
			{time: new Date(), text: 'log started'}
		],
		lastTransferedEnergyToHeat: 0,
	},
	methods: {
		doIncome: function () {
			this.lastTransferedEnergyToHeat = this.counters.energy.value;
			this.counters.heat.value += this.lastTransferedEnergyToHeat
			this.counters.energy.value = 0

			for (let key in this.counters) {
				let counter = this.counters[key]
				this.saveLastValues(counter);

				counter.value += counter.income
			}

			this.doLog('incomes added, transfered ' + this.lastTransferedEnergyToHeat + ' energy2heat')
			this.doLog('~ NEW TURN ~')
		},
		reverseIncome: function () {
			this.counters.heat.value -= this.lastTransferedEnergyToHeat
			this.counters.energy.value += this.lastTransferedEnergyToHeat

			for (let key in this.counters) {
				let counter = this.counters[key]
				this.saveLastValues(counter);

				counter.value -= counter.income
			}

			this.doLog('incomes reversed (' + this.lastTransferedEnergyToHeat + ' heat2energy included)')
		},

		saveLastValues: function (counter) {
			counter.lastValue = counter.value
			counter.lastIncome = counter.income
		},

		subtract8greens: function () {
			this.counters.green.value -= 8;
			this.doLog('-8 trees, +1 forest!')
		},

		doLog: function (message) {
			this.log.unshift({time: new Date(), text: message})
		},
	}
});
