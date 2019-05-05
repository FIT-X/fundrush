<template>
  <div class="container">
    <h1>Company Credit Limit</h1>
    <form @submit.prevent="submit">
      <label>Net Inventory Value</label>
      <input v-model="netInventoryValue" type="text">
      <label>Net Asset Value</label>
      <input v-model="netAssetValue" type="text">
      <label>Inventory Insurance Coverage</label>
      <input v-model="inventoryInsuranceCoverage" type="text">
      <label>Total Verified Loss</label>
      <input v-model="totalVerifiedLoss" type="text">
      <label>Verified LossReal Estate</label>
      <input v-model="verifiedLossRealEstate" type="text">
      <label>Annual Net Revenue</label>
      <input v-model="annualNetRevenue" type="text">
      <label>Annual Operating Cost</label>
      <input v-model="annualOperatingCost" type="text">
      <input
        v-model="buildingInsuranceCoverage"
        type="text"
        placeholder="Building Insurance Coverage"
      >
      <input v-model="insuranceDeductible" type="text" placeholder="Insurance Deductible">
      <input v-model="insurancePremium" type="text" placeholder="Insurance Premium">
    </form>
    <button class="snip1582" @click="submit">Apply</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

interface CompanyCreditLimitParameters {
  netInventoryValue: number;
  netAssetValue: number; // building, premises etc
  inventoryInsuranceCoverage: number;
  totalVerifiedLoss: number;
  verifiedLossRealEstate: number;
  annualNetRevenue: number;
  annualOperatingCost: number;
  buildingInsuranceCoverage: number;
  insuranceDeductible: number;
  insurancePremium: number;
}
// netInventoryValue: 2300,
//     netAssetValue: 20000,
//     inventoryInsuranceCoverage: 600,
//     totalVerifiedLoss: 100121,
//     verifiedLossRealEstate: 98421,
//     annualNetRevenue: 348000,
//     annualOperatingCost: 292000,
//     buildingInsuranceCoverage: 72000,
//     insuranceDeductible: 3000,
//     insurancePremium: 7000
@Component
export default class HelloWorld extends Vue {
  netInventoryValue = '2300';
  netAssetValue = '200000';
  inventoryInsuranceCoverage = '600';
  totalVerifiedLoss = '100121';
  verifiedLossRealEstate = '98421';
  annualNetRevenue = '348000';
  annualOperatingCost = '292000';
  buildingInsuranceCoverage = '72000';
  insuranceDeductible = '3000';
  insurancePremium = '7000';
  @Prop() private msg!: string;
  submit() {
    console.log("submitted!");
    const body: CompanyCreditLimitParameters = {
      netInventoryValue: parseInt(this.netInventoryValue),
      netAssetValue: parseInt(this.netAssetValue) || 0,
      inventoryInsuranceCoverage: parseInt(this.inventoryInsuranceCoverage) || 0,
      totalVerifiedLoss: parseInt(this.totalVerifiedLoss) || 0,
      verifiedLossRealEstate: parseInt(this.verifiedLossRealEstate) || 0,
      annualNetRevenue: parseInt(this.annualNetRevenue) || 0,
      annualOperatingCost: parseInt(this.annualOperatingCost) || 0,
      buildingInsuranceCoverage: parseInt(this.buildingInsuranceCoverage) || 0,
      insuranceDeductible: parseInt(this.insuranceDeductible) || 0,
      insurancePremium: parseInt(this.insurancePremium) || 0
    };
    console.log(body);
    const next = (response: any) => {
      console.log(response);
      this.$router.push({
        name: "v3End",
        params: { limit: response.data.limit }
      });
    };
    axios.post("http://fundrush.fund/generateCreditLimit", body).then(next);
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);
.snip1582 {
  background-color: #4aa4f7;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "BenchNine", Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 40px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}

.snip1582:before,
.snip1582:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}

.snip1582:before {
  border-color: #4aa4f7;
  border-top-width: 2px;
  left: 0px;
  top: -5px;
}

.snip1582:after {
  border-bottom-width: 2px;
  border-color: #4aa4f7;
  bottom: -5px;
  right: 0px;
}

.snip1582:hover,
.snip1582.hover {
  background-color: #4aa4f7;
}

.snip1582:hover:before,
.snip1582.hover:before,
.snip1582:hover:after,
.snip1582.hover:after {
  height: 100%;
  width: 100%;
}
</style>
