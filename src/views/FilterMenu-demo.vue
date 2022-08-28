<template>
  <bd-div
    type="bd-filterMenu-pc"
    :data="menuData"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData: [{
        'id': '1',
        'name': '专题分类',
        'required': true,
        'children': [{
          'id': '11',
          'name': '公司运营'
        }, {
          'id': '12',
          'name': '品牌运营'
        }, {
          'id': '13',
          'name': '终端应用'
        }, {
          'id': '14',
          'name': '渠道管理'
        }, {
          'id': '15',
          'name': '数据集市'
        }]
      }, {
        'id': '2',
        'name': '展现形式',
        // "multi":false,
        'children': [{
          'id': '21',
          'name': 'KPI'
        }, {
          'id': '22',
          'name': '固定报表'
        }, {
          'id': '23',
          'name': '即席查询',
          'children': [{
            'id': '231',
            'name': '即席1',
            'children': [{
              'id': '2311',
              'name': '许晓旭'
            }, {
              'id': '2312',
              'name': '陈圣华'
            }, {
              'id': '2313',
              'name': '严鑫强'
            }, {
              'id': '2314',
              'name': '林梅琴',
              'children': [{
                'id': '23141',
                'name': '林美琴1'
              }, {
                'id': '23142',
                'name': '林美琴2'
              }, {
                'id': '23143',
                'name': '林美琴3'
              }, {
                'id': '23144',
                'name': '林美琴4'
              }]
            }]
          }, {
            'id': '232',
            'name': '即席2',
            'children': [{
              'id': '2321',
              'name': 'xxx1'
            }, {
              'id': '2322',
              'name': 'xxx2'
            }, {
              'id': '2323',
              'name': 'xxx3'
            }, {
              'id': '2324',
              'name': 'xxx15',
              'children': [{
                'id': '23241',
                'name': '东北银'
              }, {
                'id': '23242',
                'name': '高级黑'
              }, {
                'id': '23243',
                'name': '土豪金'
              }, {
                'id': '23244',
                'name': '脑残粉'
              }]
            }]
          }, {
            'id': '233',
            'name': '即席3'
          }, {
            'id': '234',
            'name': '即席4'
          }, {
            'id': '235',
            'name': '即席5'
          }]
        }, {
          'id': '24',
          'name': '多维分析',
          'children': [{
            'id': '241',
            'name': '语音',
            'children': [{
              'id': '2411',
              'name': '黄桃'
            }, {
              'id': '2412',
              'name': '油桃'
            }, {
              'id': '2413',
              'name': '水蜜桃'
            }, {
              'id': '2414',
              'name': '杨桃'
            }]
          }, {
            'id': '242',
            'name': '数据'
          }, {
            'id': '243',
            'name': '家庭'
          }, {
            'id': '244',
            'name': '集团'
          }, {
            'id': '245',
            'name': '增值'
          }, {
            'id': '246',
            'name': '互联网'
          }, {
            'id': '247',
            'name': '电子优惠券'
          }, {
            'id': '248',
            'name': '移动端'
          }]
        }]
      }, {
        'id': '3',
        'name': '项目阶段',
        'children': [{
          'id': '31',
          'name': '设计阶段'
        }, {
          'id': '32',
          'name': 'WEB'
        }, {
          'id': '33',
          'name': '数据绑定'
        }, {
          'id': '34',
          'name': '页面审计'
        }, {
          'id': '35',
          'name': '功能测试'
        }, {
          'id': '36',
          'name': '上线运营'
        }, {
          'id': '37',
          'name': '上线运营'
        }, {
          'id': '38',
          'name': '上线运营'
        }, {
          'id': '39',
          'name': '上线运营'
        }, {
          'id': '310',
          'name': '上线运营'
        }, {
          'id': '311',
          'name': '上线运营'
        }]
      }, {
        'id': '4',
        'name': '部署主机',
        'children': [{
          'id': '41',
          'name': '福建省经分',
          'children': [{
            'id': '411',
            'name': '领导首页'
          }, {
            'id': '412',
            'name': '员工首页'
          }, {
            'id': '413',
            'name': '用户画像'
          }]
        }, {
          'id': '42',
          'name': '湖南省经分'
        }, {
          'id': '43',
          'name': '海南省大数据'
        }, {
          'id': '44',
          'name': '福建省广电'
        }, {
          'id': '45',
          'name': '核心库中间表'
        }, {
          'id': '46',
          'name': '历史库中间表'
        }, {
          'id': '47',
          'name': '核心库中间表'
        }, {
          'id': '48',
          'name': '应急库报表'
        }, {
          'id': '49',
          'name': '应急库中间表'
        }, {
          'id': 'x410',
          'name': '历史库中间表'
        }, {
          'id': 'x411',
          'name': '核心库中间表'
        }]
      }]
    };
  }
};
</script>

<style lang="scss"></style>
