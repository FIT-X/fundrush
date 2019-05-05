<template>
    <div class='transactions'>
        <transition-group name="list" tag="div">
            <div class='transaction' v-for='transaction in transactions' :key='transaction.transId'>
                <div class='trans-id'>{{transaction.transId}}</div>
                <div class='time'>{{transaction.submitTimeLocal}}</div>
                <div class='status' :class="{[transaction.transactionStatus]: true}">{{transaction.transactionStatus}}</div>
                <div class='name'>{{transaction.lastName}}, {{transaction.firstName}}</div>
                <div class='amount'>$ {{transaction.settleAmount}}</div>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// @ts-ignore
import { APIContracts as ApiContracts, APIControllers as ApiControllers } from 'authorizenet';

@Component({})
export default class Home extends Vue {
    trans = [];
    get transactions() {
        return this.trans;
    }
    mounted() {
        setInterval(() => {
            getUnsettledTransactionList((response: any) => {
                console.log('update...')
                replaceArray(this.trans, response.transactions.transaction)
            })
        }, 5000);
        getUnsettledTransactionList((response: any) => {
            console.log('update...')
            replaceArray(this.trans, response.transactions.transaction)
        })
    }
}


function getUnsettledTransactionList(callback: any) {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    // @ts-ignore
    merchantAuthenticationType.setName(process.env.VUE_APP_AUTH_NET_LOGIN_ID);
    // @ts-ignore
    merchantAuthenticationType.setTransactionKey(process.env.VUE_APP_AUTH_NET_TRANS_KEY);

    var getRequest = new ApiContracts.GetUnsettledTransactionListRequest();

    var paging = new ApiContracts.Paging();
    paging.setLimit(100);
    paging.setOffset(1);

    var sorting = new ApiContracts.TransactionListSorting();
    sorting.setOrderBy(ApiContracts.TransactionListOrderFieldEnum.ID);
    sorting.setOrderDescending(true);

    getRequest.setMerchantAuthentication(merchantAuthenticationType);
    // getRequest.setStatus(ApiContracts.TransactionGroupStatusEnum.PENDINGAPPROVAL);
    getRequest.setPaging(paging);
    getRequest.setSorting(sorting);

    console.log(JSON.stringify(getRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.GetUnsettledTransactionListController(getRequest.getJSON());

    ctrl.execute(function () {

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.GetUnsettledTransactionListResponse(apiResponse);

        // console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactions() != null) {
                    var transactions = response.getTransactions().getTransaction();
                    for (var i = 0; i < transactions.length; i++) {
                        // console.log('Transaction Id : ' + transactions[i].getTransId());
                        // console.log('Transaction Status : ' + transactions[i].getTransactionStatus());
                        // console.log('Amount Type : ' + transactions[i].getAccountType());
                        // console.log('Settle Amount : ' + transactions[i].getSettleAmount());
                    }
                }
                console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
                console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
            }
            else {
                console.log('Result Code: ' + response.getMessages().getResultCode());
                console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
            }
        }
        else {
            console.log('Null Response.');
        }

        callback(response);
    });
}

/**
 * Replace elements of an array. Causes Vue to update bindings correctly.
 * @param array
 * @param newValues
 */
function replaceArray<T>(array: T[], newValues: T[]) {
    array.splice(0, array.length, ...newValues);
}
</script>

<style lang="scss" scoped>
.transactions {
    text-align: left;
    .transaction {
        border: #09a4fe solid 1px;
        border-radius: 10px;
        margin: 10px;
        padding: 20px;
        .name,
        .time {
            color: gray;
        }
        .status {
            &.authorizedPendingCapture {
                color: #63c621;
            }
            &.capturedPendingSettlement {
                color: #5da9de;
            }
        }
    }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
