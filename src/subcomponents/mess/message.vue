<template>
  <div id="msg-dependencies" v-if="msgCount == 0">
  </div>
</template>

<script>
  export default {
      data(){
        return {

        }
      },
      computed:{
         msgCount(){
           var type = this.$store.state.msg.type;
           var msg = this.$store.state.msg.content;
           if(msg !== "") {
             var param = { "type":type, message:msg };
             console.log("message param:",param)
             this.$message(param);
           }
           return this.$store.state.msg.count;
         }
      }
  }
</script>
