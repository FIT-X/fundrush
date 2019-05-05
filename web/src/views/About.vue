<template>
    <div class="container">
        <h1>
            Disaster Relief Emergency
            <br>Bridge Loan Program
        </h1>
        <form @submit.prevent="submit">
            <p>
                <b>Before you can apply for relief, you must read the following documents:</b>
            </p>
            <br>
            <a href="https://www.fema.gov/media-library/assets/documents/18113?id=4098"
                target="_blank">General Property Policy Form</a>
            <p>The General Property Policy Form is issued to owners of residential buildings with five or more units, and to owners or lessees of non-residential buildings or units. You must be familiar with this form if you are a renter or lessee in a disaster area.</p>
            <br>
            <a href="https://www.fema.gov/media-library-data/1449522308118-6752c210f65aed326a9ddf4a0ddaca1f/F-122_Dwelling_SFIP_102015.pdf"
                target="_blank">Dwelling Form</a>
            <p>Dwelling Form: The Dwelling Policy Form may be issued to homeowners, residential renters and condominium unit-owners, owners of residential buildings containing two to four units.</p>
            <br>
            <a href="https://www.fema.gov/media-library/assets/videos/167309"
                target="_blank">National Flood Insurance Program Video</a>
            <p>August 1st, 2018 marks the 50th anniversary of the National Flood Insurance Program (NFIP). On this video, we talk to David Maurstad, chief executive of the National Flood Insurance Program, about the history and the future of the NFIP and how it continues to serve communities across the United States, especially flood prone areas.</p>
            <br>
            <a href="https://www.fema.gov/media-library/assets/videos/165832"
                target="_blank">What do I need to know about flood insurance coverage?</a>
            <p>Detailed insight into what is covered under flood insurance, and how to optimize insurance coverage</p>
            <br>
            <a href="https://www.naic.org/documents/cipr_study_1704_flood_risk.pdf?25"
                target="_blank">Flood risk and insurance study</a>
            <p>The NAIC Property and Casualty (C) Committee is charged to collect and analyze NFIP data, and create a best practices document to help facilitate the private flood insurance market. In addition, the NAIC Center for Insurance Policy and Research (CIPR) recently released a study, Flood Risk and Insurance, which examines the rising flood risk in the country and the need to overhaul the NFIP while encouraging greater growth in the private flood insurance market.</p>
            <br>
            <p>Type 'yes' to confirm that you have reviewed these documents throughly.</p>
            <input
                type="text"
                name="fillDate"
                v-model="confirm"
                placeholder="Confirm">
            <button :disabled="confirm.toLowerCase() !== 'yes'" class="snip1582" type="submit">Next Page</button>
        </form>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    confirm = '';
    @Prop() private msg!: string;
    submit() {
        console.log("submitted!");
        this.$router.push({ name: 'v2apply' });
    }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);
a {
    font-size: 20px;
}
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
button {
    &:disabled {
        border: solid 1px gray;
        background-color: white;
        color: gray;
        &::before,
        &::after {
            border-color: white;
        }
        &:hover {
            background-color: white;
            color: gray;
        }
    }
}
</style>
