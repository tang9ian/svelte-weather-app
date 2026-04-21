export const popularCities = {
  en: [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Moscow', 'Dubai',
    'Singapore', 'Los Angeles', 'Chicago', 'Toronto', 'Madrid', 'Rome', 'Amsterdam',
    'Barcelona', 'Vienna', 'Prague', 'Stockholm', 'Copenhagen', 'Helsinki', 'Oslo',
    'Zurich', 'Geneva', 'Brussels', 'Dublin', 'Edinburgh', 'Manchester', 'Liverpool',
    'Birmingham', 'Glasgow', 'Cardiff', 'Belfast', 'Leeds', 'Sheffield', 'Bristol',
    'Newcastle', 'Nottingham', 'Leicester', 'Coventry', 'Hull', 'Bradford', 'Stoke',
    'Wolverhampton', 'Plymouth', 'Derby', 'Southampton', 'Portsmouth', 'Brighton'
  ],
  zh: [
    '北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都', '重庆', '西安',
    '天津', '苏州', '长沙', '郑州', '青岛', '大连', '宁波', '厦门', '福州', '济南',
    '石家庄', '长春', '哈尔滨', '沈阳', '太原', '合肥', '南昌', '贵阳', '昆明', '兰州',
    '银川', '西宁', '乌鲁木齐', '拉萨', '呼和浩特', '海口', '三亚', '香港', '澳门', '台北',
    '无锡', '常州', '徐州', '扬州', '镇江', '泰州', '南通', '盐城', '淮安', '连云港'
  ]
};

export function getCitySuggestions(query, locale = 'en') {
  if (!query || query.length < 1) return [];
  
  const cities = popularCities[locale] || popularCities.en;
  const lowerQuery = query.toLowerCase();
  
  return cities
    .filter(city => city.toLowerCase().includes(lowerQuery))
    .slice(0, 5)
    .map(city => ({
      label: city,
      query: city
    }));
}
