<script lang="tsx" setup >


import { PocketBaseService } from '../service/pocketBaseService'
import { useLinkStore } from '../stores/links';


import dayjs from 'dayjs'
import {
    ElIcon,
    ElTag,
    ElTooltip,
    TableV2FixedDir,
} from 'element-plus'
import { Timer } from '@element-plus/icons-vue'

import type { Column } from 'element-plus'

const linkStore = useLinkStore();
linkStore.fetchLinks();
const pb = new PocketBaseService();
console.log(pb.IsUserLoggedIn());
console.log(linkStore.links);
const columns: Column<any>[] = [
    {
        key: 'created',
        title: 'Date',
        dataKey: 'created',
        width: 150,
        fixed: TableV2FixedDir.LEFT,
        cellRenderer: ({ cellData: created }) => (
            <ElTooltip content={dayjs(created).format('YYYY/MM/DD')} >
                {
                    < span class="flex items-center" >
                        <ElIcon class="mr-3">
                            <Timer />
                        </ElIcon>
                        {dayjs(created).format('YYYY/MM/DD')}
                    </span>
                }
            </ElTooltip>
        ),
    },
    {
        key: 'link',
        title: 'Link',
        dataKey: 'link',
        width: 150,
        align: 'center',
        cellRenderer: ({ cellData: link }) => <ElTag>{link} </ElTag>,
    }
]



</script>

<template>
    <el-table-v2 :columns="columns" :data="linkStore.links" :width="700" :height="400" fixed />
</template>