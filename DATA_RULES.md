# Data Rules

## Eligible Countries Rules

1. `eligibleCountries` must come from official scholarship, government, embassy, university, or programme sources only.
2. Do not write `"All countries"` unless the official source clearly says international applicants from all countries, all nationalities, all countries except listed exclusions, or equivalent.
3. If the official source lists only eligible countries, add the full list to `eligibleCountries`.
4. If the official source lists excluded countries, add `["All countries except listed exclusions"]` to `eligibleCountries` and list excluded countries in `ineligibleCountries`.
5. If eligibility depends on applicant country office, embassy, nomination agency, or partner country list, explain this in `eligibilityCountryNotes`.
6. Always include `eligibilitySourceUrl` for country eligibility.
7. If exact country eligibility cannot be confirmed from official sources, do not guess. Use:

```ts
eligibleCountries: []
eligibilityCountryNotes: "Country eligibility must be checked on the official source before publishing."
```

8. Every scholarship must include `lastVerified` in `YYYY-MM-DD` format.
9. Do not invent deadlines, benefits, stipend amounts, or application steps.
