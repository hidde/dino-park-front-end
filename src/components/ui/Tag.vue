<template>
  <span
    :class="`tag ${draggable ? 'tag--draggable' : ''}`"
    :draggable="draggable"
    v-on="
      draggable
        ? {
            dragover: dragOver,
            dragstart: dragStart,
            dragend: dragEnd,
          }
        : {}
    "
  >
    <Button
      class="button--icon-only button--text-only"
      v-if="removable"
      @click="$emit('removeTag')"
    >
      <Icon id="x" :width="16" :height="16"></Icon
      ><span class="visually-hidden">Remove {{ tag }}</span></Button
    >{{ tag }}</span
  >
</template>

<script>
/* https://codepen.io/crouchingtigerhiddenadam/pen/qKXgap */
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Tag',
  props: {
    tag: String,
    removable: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    index: Number,
  },
  components: {
    Button,
    Icon,
  },
  methods: {
    dragOver(e) {
      const draggingOver = e.target;
      const newIndex = this.getElIndex(draggingOver);

      this.$emit('reorder', newIndex);
      e.stopPropagation();
    },
    dragStart(e) {
      const index = this.getElIndex(e.target);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', null);
      this.$emit('dragStart', index);
    },
    dragEnd() {
      this.$emit('dragEnd');
    },
    getElIndex(el) {
      return Array.prototype.indexOf.call(el.parentNode.children, el);
    },
  },
  data() {
    return {
      dragging: null,
    };
  },
};
</script>

<style>
.tag[draggable] {
  user-select: none;
  cursor: grabbing;
}
.tag {
  display: inline-block;
  vertical-align: top;
  margin: 0 0.5em 0.5em 0;
  white-space: nowrap;
  padding: 1.1em;
  background-color: var(--gray-10);
  border-radius: 2em;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
.tag button {
  border-color: transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: baseline;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.tag button:hover {
  color: var(--black);
  background-color: transparent;
}
</style>
