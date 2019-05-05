export interface CompanyCreditLimitParameters {
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
export function getCompanyCreditLimit(parameters: CompanyCreditLimitParameters) {
    const {
        netInventoryValue,
        netAssetValue,
        inventoryInsuranceCoverage,
        totalVerifiedLoss,
        verifiedLossRealEstate,
        annualNetRevenue,
        annualOperatingCost,
        buildingInsuranceCoverage,
        insuranceDeductible,
        insurancePremium,
    } = parameters;
    const MAX_LIMIT_RATIO = 0.8;

    const absoluteMaxLimit = (netAssetValue + netInventoryValue) * MAX_LIMIT_RATIO;

    const INVENTORY_INSURANCE_COVERAGE_RATIO = 0.8;
    const BUILDING_INSURANCE_COVERAGE_RATIO = 0.4;
    const SBA_LOAN_VALUE_RATIO = 0.7;
    const PROFIT_RATIO = 0.7;

    const SBALoanValue = SDALoanModel({ totalVerifiedLoss, verifiedLossRealEstate });
    console.log(SBALoanValue);

    const maxLimit =
        (INVENTORY_INSURANCE_COVERAGE_RATIO * inventoryInsuranceCoverage)
        + (BUILDING_INSURANCE_COVERAGE_RATIO * buildingInsuranceCoverage)
        + (SBA_LOAN_VALUE_RATIO * SBALoanValue)
        + (annualNetRevenue - annualOperatingCost) * PROFIT_RATIO
        - insuranceDeductible
        - insurancePremium;
        console.log(absoluteMaxLimit, maxLimit)

    const limit = Math.min(absoluteMaxLimit, maxLimit);
    return limit;
}

export interface IndividualCreditLimitParameters {
    netPosessionValue: number;
    netAssetValue: number; // building, premises etc
    possessionInsuranceCoverage: number;
    homeInsuranceCoverage: number;
    annualNetRevenue: number;
    annualNetExpenses: number;
    insuranceDeductible: number;
    insurancePremium: number;
}

export function getIndividualCreditLimit(parameters: IndividualCreditLimitParameters) {
    const {
        netPosessionValue,
        netAssetValue,
        possessionInsuranceCoverage,
        homeInsuranceCoverage,
        annualNetRevenue,
        annualNetExpenses,
        insuranceDeductible,
        insurancePremium,
    } = parameters;

    const MAX_LIMIT_RATIO = 0.8;

    const absoluteMaxLimit = (netAssetValue + netPosessionValue) * MAX_LIMIT_RATIO;

    const POSSESSION_INSURANCE_COVERAGE_RATIO = 0.8;
    const HOME_INSURANCE_COVERAGE_RATIO = 0.7;
    const PREDICTED_FEMA_GRANT_RATIO = 0.8;

    const predictedFEMAGrant = 0;

    const maxLimit =
        (POSSESSION_INSURANCE_COVERAGE_RATIO * possessionInsuranceCoverage)
        + (HOME_INSURANCE_COVERAGE_RATIO * homeInsuranceCoverage)
        + (PREDICTED_FEMA_GRANT_RATIO * predictedFEMAGrant)
        + (annualNetRevenue - annualNetExpenses) // Profit
        - insuranceDeductible
        - insurancePremium;
    const limit = Math.min(absoluteMaxLimit, maxLimit);
    return limit;
}

export interface SDALoanModelParameters {
    totalVerifiedLoss: number;
    verifiedLossRealEstate: number;
}

function SDALoanModel({ totalVerifiedLoss, verifiedLossRealEstate }: SDALoanModelParameters) {
    // Logistic Model coefficients 
    const totalApprovedLoanAmmount =
        1178.1521
        + 1.5652 * totalVerifiedLoss
        - 0.4133 * verifiedLossRealEstate
    return totalApprovedLoanAmmount;
}

function FEMAGrantModel({ totalVerifiedLoss, verifiedLossRealEstate }: SDALoanModelParameters) {
    // Logistic Model coefficients 
    // const totalApprovedLoanAmmount =
    //     7.540e-1
    //     + 3.722e-4 * totalVerifiedLoss
    //     - 3.277e-5 * verifiedLossRealEstate
    //     + 8.587e-3 * approvedAmountRealEstate
    //     + 8.387e-3 * approvedAmountContent
    //     + 3.429e-4 * approvedAmountEIDL
    // return totalApprovedLoanAmmount;
}


