import { Selector } from 'testcafe';

fixture`Testing Student UI`
    .page`http://localhost:4401/student`
    .beforeEach(async t => {
        try {
            await t.navigateTo('/dbinitialize');
        } catch (error) {
            console.log('Error: ', error);
            await t.wait(3000);
            await t.navigateTo('/dbinitialize');
        }
    });

test('Testing add students', async t => {
    await t.navigateTo('/addStudent');
    await t.typeText('#student-id', '999999');
    await t.typeText('#student-name', 'Pasindu Basnayaka');
    await t.typeText('#student-age', '45');
    await t.typeText('#student-Hometown', 'Catholic');
    await t.click('#student-add');

    await t.navigateTo('/student');

    const table = Selector('#student-table');
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains('Pasindu Basnayaka');
});
