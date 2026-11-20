const names =
  "aarav_shah priya.patel jay_mehta kavya_desai rohan.joshi neha_trivedi dev.parmar isha_bhatt harsh_vyas meera.solanki om_raval tanvi_pandya karan.gohil riya_dave yash_chauhan dhruv.thakkar sneha_modi vivek_rathod pooja_zala nirav_kotak foodie_bhavnagar travel.gujarat photo_by_ankit fit_with_jigar kitchen_by_hetal tech.talks.guj local_news_gj meme_page_guj designer.nidhi cricket_fan_77 shop.surat.official anjali_k manav.dholakia krupa_sheth bhavik_bhatt zeel.vora".split(
    " ",
  );

export function makeDemoData() {
  const followers = new Set();
  const following = new Set();
  names.forEach((n, i) => {
    if (i % 3 !== 1) followers.add(n);
    if (i % 4 !== 2) following.add(n);
  });
  return { followers, following };
}
