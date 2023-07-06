// describe('only spy on handed over list', () => {
//   it('should emit event on load', async () => {
//     const page = await newE2EPage();
//     await page.setContent('<corporate-disease-list></corporate-disease-list>');
//     const element = await page.find('corporate-disease-list');
//     const spy = await element.spyOnEvent('handleDiseasesList');
//     await page.waitForTimeout(1500);

//     expect(spy.events[0].detail.payload).toHaveLength(13);
//     expect(spy.events[0].detail.payload).toEqual(
//       expect.arrayContaining([
//         {
//           header: 'Blood',
//           diseases: [
//             { title: 'Blood', link: '/health-wellness/disease-conditions/blood' },
//             { title: 'Hemophilia', link: '/focus-areas/rare-disease/hemophilia' },
//             { title: 'Sickle Cell Anemia', link: '/focus-areas/rare-disease/sickle-cell' },
//           ],
//         },
//       ]),
//     );
//   });
// });
