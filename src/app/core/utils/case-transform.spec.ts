import { camelToSnake, snakeToCamel } from "./case-transform";

describe('CaseTransform', () => {
    const snakeCaseResponse = {
        user_id: 1,
        user_addresses: [
            {
                street_name: 'Main Street',
                postal_code: '12345'
            },
            {
                street_name: 'Second Street',
            }
        ]
    }
    const camelCaseResponse = {
        userId: 1,
        userAddresses: [
            {
                streetName: 'Main Street',
                postalCode: '12345'
            },
            {
                streetName: 'Second Street',
            }
        ]
    };

    it('should transform camelCase to snake_case recursively', () => {
        expect(snakeToCamel(snakeCaseResponse)).toEqual(camelCaseResponse);
    });

    it('should transform snake_case to camelCase recursively', () => {
        expect(camelToSnake(camelCaseResponse)).toEqual(snakeCaseResponse);
    });
});