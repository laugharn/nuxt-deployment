<script>
import diy from "../mixins/diy";

/**
 * A table. Very WIP.
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyTable",

    props: {
        /**
         * The data for the table body
         */
        bodyData: {
            default: null,
            type: Array
        },

        /**
         * The caption of the table
         */
        caption: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the caption
         */
        captionClasses: {
            default: "--default",
            type: String
        },

        /**
         * The data for the table head
         */
        headData: {
            default: null,
            type: Array
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the body
         */
        showBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the head
         */
        showHead: {
            default: true,
            type: Boolean
        },

        /**
         * Classes that can be applied to the top level table
         */
        tableClasses: {
            default: "table-bordered",
            type: String
        },

        /**
         * Classes that can be applied to the tbody
         */
        tbodyClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to each th
         */
        thClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the thead
         */
        theadClasses: {
            default: "--default",
            type: String
        }
    }
};
</script>

<template>
    <table class="table" :class="tableClasses" :id="id" v-if="show">
        <!-- @slot The default slot -->
        <slot>
            <!-- @slot The caption slot -->
            <slot name="caption">
                <caption class="Table__caption" :class="captionClasses" :id="identify('caption')" v-html="markdown(caption)" v-if="caption"></caption>
            </slot>
            <!-- @slot The head slot -->
            <slot name="head">
                <thead class="Table__thead" :class="theadClasses" :id="identify('thead')" v-show="showHead">
                    <tr class="Table__thead-tr" :id="identify('thead-tr')">
                        <th class="Table__thead-th" :class="thClasses" :key="thIndex" v-for="(th, thIndex) in headData" scope="col">
                            <!-- @slot The th scoped slot -->
                            <slot v-bind="th">{{ markdown(th.content) }}</slot>
                        </th>
                    </tr>
                </thead>
            </slot>
            <!-- @slot The body slot -->
            <slot name="body">
                <tbody class="Table__tbody" :class="tbodyClasses" :id="identify('tbody')" v-show="showBody">
                    <tr class="Table__tbody-tr" :class="tr.classes" :key="trIndex" v-for="(tr, trIndex) in bodyData">
                        <!-- @slot The tr slot -->
                        <slot v-bind="tr">
                            <td class="Table__tbody-td" :class="td.classes" :key="tdIndex" v-for="(td, tdIndex) in tr">
                                <!-- @slot The td slot -->
                                <slot v-bind="td">{{ markdown(td.content) }}</slot>
                            </td>
                        </slot>
                    </tr>
                </tbody>
            </slot>
        </slot>
    </table>
</template>
